import { ComponentProps, FC, FormEventHandler, useState } from "react";
import { BookingStep } from "../BookingStep";

interface Props {
  language: string;
  onSubmit: (info: BookingPatientInfo) => void;
}
export const PatientInfoStep: FC<Props> = ({ language, onSubmit }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [areacode, setAreacode] = useState("+46");
  const [phone, setPhone] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      onSubmit({ name, birthdate, areacode, phone });
    }
  };

  return (
    <BookingStep
      language={language}
      className="max-w-[35rem]"
      title="Pasientopplysninger"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-40" noValidate>
        <div className="flex flex-col gap-10">
          <label htmlFor="name">Pasientens navn*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Fornavn Etternavn"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="bg-transparent border-b placeholder:text-black/3 text-small py-10 peer"
            required
          />
          <p className="peer-invalid:block hidden">Fyll i ditt namn</p>
        </div>
        <div className="flex flex-col gap-10">
          <label htmlFor="birthdate">Pasientens fødelsesdato*</label>
          <input
            type="text"
            id="birthdate"
            name="birthdate"
            placeholder="MM/DD ÅÅÅÅ"
            value={birthdate}
            onChange={(e) => setBirthdate(e.currentTarget.value)}
            className="bg-transparent border-b placeholder:text-black/3 text-small py-10 peer"
            required
          />
          <p className="peer-invalid:block hidden">Fyll i ditt personnummer</p>
        </div>
        <div className="flex flex-col gap-10">
          <label htmlFor="phone">Telefonnummer</label>
          <div className="flex gap-10 border-b items-center">
            <span className="border border-black/10 px-10 h-30 flex items-center justify-center rounded-15">
              +46
            </span>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              className="bg-transparent placeholder:text-black/3 text-small py-10 grow"
            />
          </div>
        </div>
        <div className="flex justify-center mt-40">
          <button type="submit" className="bg-yellow pill">
            Bekreft timebestilling
          </button>
        </div>
      </form>
    </BookingStep>
  );
};
