import { Wrapper } from "@googlemaps/react-wrapper";
import { Stack } from "@sanity/ui";
import { FC, FormEventHandler, useCallback, useEffect, useRef } from "react";
import { ObjectInputProps, PatchEvent, set, ObjectInputMember } from "sanity";

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
  );

interface Props {
  location?: { _type: "geopoint"; lat?: number; lng?: number };
  placeId?: string;
}

const LocationInput: FC<
  Pick<ObjectInputProps<Props>, "value" | "onChange" | "readOnly">
> = ({ value, onChange, readOnly }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<google.maps.Map>();
  const markerRef = useRef<google.maps.Marker>();

  const setMarker = useCallback(
    (
      placeId?: string | undefined,
      location?: { lat?: number; lng?: number }
    ) => {
      if (!markerRef.current) return;
      // Set the position of the marker using the place ID and location.
      // @ts-ignore This should be in @typings/googlemaps.
      markerRef.current.setPlace({
        placeId,
        location,
      });
      markerRef.current.setVisible(true);
    },
    []
  );

  useEffect(() => {
    if (!ref.current || !inputRef.current) return;
    const center = {
      lat: value?.location?.lat ?? 62.970925,
      lng: value?.location?.lng ?? 14.1326046,
    };
    const map = new google.maps.Map(ref.current, {
      center,
      zoom: value?.location ? 14 : 4,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    mapRef.current = map;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["place_id", "geometry"],
    });
    autocomplete.bindTo("bounds", map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);

    const marker = new google.maps.Marker({ map: map });
    markerRef.current = marker;

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      const newValue = {
        _type: "location",
        location: {
          _type: "geopoint",
          ...place.geometry.location.toJSON(),
        },
        address: place.formatted_address,
        phoneNumber: place.formatted_phone_number,
        placeId: place.place_id,
      };
      onChange(PatchEvent.from(set(newValue)));
    });
  }, []);

  useEffect(
    () => setMarker(value?.placeId, value?.location),
    [value?.placeId, value?.location?.lat, value?.location?.lng]
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="search"
        ref={inputRef}
        style={{
          position: "absolute",
          margin: "10px",
          lineHeight: "20px",
          padding: "10px",
          border: "0",
          fontFamily: "Roboto, Arial, sans-serif",
          fontSize: "18px",
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
        }}
        placeholder="Search for location"
      />
      <div
        ref={ref}
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
      />
    </div>
  );
};

export const LocationSearch: FC<ObjectInputProps<Props>> = (props) => {
  const { value, readOnly, onChange, elementProps, members } = props;

  const placeIdMember = members.find(
    (m) => m.kind === "field" && m.name === "placeId"
  );
  const locationMember = members.find(
    (m) => m.kind === "field" && m.name === "location"
  );
  const renderProps = {
    renderField: props.renderField,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  };

  const handleChangeAddress: FormEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    onChange(
      PatchEvent.from(
        set({
          ...props.value,
          address: value,
        })
      )
    );
  };
  const handleChangePhoneNumber: FormEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    onChange(
      PatchEvent.from(
        set({
          ...props.value,
          phoneNumber: value,
        })
      )
    );
  };
  return (
    <Wrapper
      apiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      version="weekly"
      libraries={["places"]}
    >
      <Stack space={2}>
        <LocationInput value={value} onChange={onChange} readOnly={readOnly} />
        {placeIdMember && (
          <ObjectInputMember member={placeIdMember} {...renderProps} />
        )}
        {locationMember && (
          <ObjectInputMember member={locationMember} {...renderProps} />
        )}
      </Stack>
    </Wrapper>
  );
};
