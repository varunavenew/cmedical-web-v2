import { at, defineMigration, set, setIfMissing } from "@sanity/migrate";

// A manually created map of specialist page slugs with their corresponding id in Metodika
const metodikaCaregivers: Record<string, { metodikaCaregiverId: number }> = {
  // Anamika Choudry (anamika.choudhury@cmedical.no): 16
  "anamika-choudhury": { metodikaCaregiverId: 16 },

  // Ane Gerda Zahl-Eriksson (N/A): 38
  "ane-gerda-z-eriksson": { metodikaCaregiverId: 38 },

  // Anita Paulsen (N/A): 40
  "anita-paulsen": { metodikaCaregiverId: 40 },

  // Anne Emilie Uhlen Gøllner (anne.emilie.gollner@cmedical.no): 2
  // Not in Sanity
  // "": { metodikaCaregiverId: 2},

  // Are Haukåen Stødle (arestodle@gmail.com ): 46
  "are-haukaen-stodle": { metodikaCaregiverId: 46 },

  // Ashi Ahmad (N/A): 41
  "ashi-ahmad": { metodikaCaregiverId: 41 },

  // Bente Haugland Berle (N/A): 78
  "bente-haugland-berle": { metodikaCaregiverId: 78 },

  // Birgir Mar Gudbrandsson (dr.biggi@hotmail.com): 61
  "birgir-gudbrandsson": { metodikaCaregiverId: 61 },

  // Birgitte Louise Aspenes (N/A): 33
  "birgitte-aspenes": { metodikaCaregiverId: 33 },

  // Birgitte Midtlid-Mork (N/A): 34
  "birgitte-mitlid-mork": { metodikaCaregiverId: 34 },

  // Bjørn Brennhovd (N/A): 26
  "bjorn-brennhovd": { metodikaCaregiverId: 26 },

  // Camilla Bringslid (N/A): 42
  "camilla-bringslid": { metodikaCaregiverId: 42 },

  // Carl Henrik Schelp (kirurgi.centrum.oresund@gmail.com): 63
  "carl-henrik-schelp": { metodikaCaregiverId: 63 },

  // Einar Andrè Brevik (einar.brevik@cmedical.no): 62
  "einar-andre-brevik": { metodikaCaregiverId: 62 },

  // Endre Søreide (endre.soreide@gmail.com): 48
  "endre-soreide": { metodikaCaregiverId: 48 },

  // Gilbert Moatshe (gilbertmoatshe@gmail.com): 50
  "gilbert-moatshe": { metodikaCaregiverId: 50 },

  // Gisle Kjøsen (gisle.kjosen@cmedical.no): 20
  // Not in Sanity
  // "": { metodikaCaregiverId: 20},

  // Ida Bjørntvedt (ida.bjorntvedt@cmedical.no): 22
  "ida-waagsbo-bjorntvedt": { metodikaCaregiverId: 22 },

  // Ingvild Skarpås Aannerud (N/A): 43
  "ingvild-skarpas-aannerud": { metodikaCaregiverId: 43 },

  // Iselin Åker (iselin.aker@cmedical.no): 4
  // Not in Sanity
  // "": { metodikaCaregiverId: 4},

  // Jackson Tok (N/A): 13
  "jackson-tok": { metodikaCaregiverId: 13 },

  // Jan Ragnar Haugstvedt (jrhaugstvedt@gmail.com): 49
  "jan-ragnar-haugstvedt": { metodikaCaregiverId: 49 },

  // Jonas Rydinge (rydinge@hotmail.com): 51
  "jonas-rydinge": { metodikaCaregiverId: 51 },

  // Jørgen Perminow (N/A): 72
  "jorgen-perminow": { metodikaCaregiverId: 72 },

  // Kristian Marstrand Warholm (dr.marstrand@icloud.com): 56
  "kristian-marstrand-warholm": { metodikaCaregiverId: 56 },

  // Lars Eldar Myrseth (lmyrseth@online.no): 58
  "lars-eldar-myrseth": { metodikaCaregiverId: 58 },

  // Lars Fredrik Qvigstad (lars.qvigstad@gmail.com): 35
  "lars-fredrik-qvigstad": { metodikaCaregiverId: 35 },

  // Madeleine Engen (N/A): 11
  "madeleine-engen": { metodikaCaregiverId: 11 },

  // Marian Bale (N/A): 44
  "marian-bale": { metodikaCaregiverId: 44 },

  // Marthe Hagen (N/A): 79
  "marthe-hagen": { metodikaCaregiverId: 79 },

  // Michael Zangani (N/A): 30
  "michael-zangani": { metodikaCaregiverId: 30 },

  // Nicolai Wessel (N/A): 27
  "nicolai-wessel": { metodikaCaregiverId: 27 },

  // Radhika Kakulavarapu (N/A): 65
  "radhika-kakulavarapu": { metodikaCaregiverId: 65 },

  // Sarah Hosseini (sarah.hosseini@rjl.se): 64
  "sarah-hosseini": { metodikaCaregiverId: 64 },

  // Siri Kløkstad (N/A): 31
  "siri-klokstad": { metodikaCaregiverId: 31 },

  // Sondre Stafsnes Hassellund (sondre.hassellund@gmail.com): 55
  "sondre-hassellund": { metodikaCaregiverId: 55 },

  // Sonu Thadiyananickal Lukose (N/A): 66
  "sonu-lukose": { metodikaCaregiverId: 66 },

  // Stig Kåre Hegna (stig.kare.hegna@unn.no): 59
  "stig-hegna": { metodikaCaregiverId: 59 },

  // Tea Lerberg Berge (teaberge@gmail.com): 57
  "tea-berge": { metodikaCaregiverId: 57 },

  // Thomas Brovold (thomas@attend.no): 75
  // Not in Sanity
  // "": { metodikaCaregiverId: 75},

  // Thomas Thaulow (N/A): 29
  "thomas-fredrik-thaulow": { metodikaCaregiverId: 29 },

  // Thorbjørn Brook-Steen (N/A): 36
  "thorbjorn-steen-brook": { metodikaCaregiverId: 36 },

  // Tonje Westlie (tonje.westlie@gmail.com): 60
  "tonje-westlie": { metodikaCaregiverId: 60 },

  // Trond Jørgensen (trond.jorgensen@cmedical.no): 37
  "trond-jorgensen": { metodikaCaregiverId: 37 },

  // XAditi XSingh (N/A): 39
  "aditi-singh": { metodikaCaregiverId: 39 },
};

export default defineMigration({
  title: "Add Metodika specialist id",
  documentTypes: ["specialistPage"],

  migrate: {
    document(specialistPage: any) {
      const slug = specialistPage.slug.current;
      if (typeof slug !== "string") {
        return;
      }

      // Check if this specialist has Metodika caregiver id
      const metodikaCaregiver = metodikaCaregivers[slug];
      if (metodikaCaregiver != null) {
        return [
          at("booking", setIfMissing({})),
          at(
            "booking.metodikaSpecialistId",
            set(metodikaCaregiver.metodikaCaregiverId)
          ),
        ];
      }
    },
  },
});
