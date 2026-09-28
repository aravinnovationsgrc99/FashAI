export interface OfficeLocation {
  id: string;
  countryCode: "IN" | "AE";
  flag: string;
  title: string; // e.g., "INDIA HEADQUARTERS (HQ)"
  shortTitle: string; // e.g., "INDIA HQ"
  cityRegion: string; // e.g., "GURGAON · HARYANA"
  addressLines: string[];
  fullAddress: string;
  mapUrl: string;
}

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "india-hq",
    countryCode: "IN",
    flag: "🇮🇳",
    title: "INDIA HEADQUARTERS (HQ)",
    shortTitle: "INDIA HQ",
    cityRegion: "GURGAON · HARYANA",
    addressLines: [
      "Platinum Floor, 14/23",
      "Ardee City, Sector 52",
      "Gurgaon, Haryana 122002",
      "India"
    ],
    fullAddress: "Platinum Floor, 14/23, Ardee City, Sector 52, Gurgaon, Haryana 122002, India",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Platinum+Floor%2C+14%2F23%2C+Ardee+City%2C+Sector+52%2C+Gurgaon%2C+Haryana+122002%2C+India",
  },
  {
    id: "uae-office",
    countryCode: "AE",
    flag: "🇦🇪",
    title: "UAE REGIONAL OFFICE",
    shortTitle: "UAE REGIONAL OFFICE",
    cityRegion: "DUBAI · UNITED ARAB EMIRATES",
    addressLines: [
      "55764-001 IFZA Business Park FZCO",
      "Building A1, Dubai Silicon Oasis",
      "Dubai",
      "United Arab Emirates"
    ],
    fullAddress: "55764-001 IFZA Business Park FZCO, Building A1, Dubai Silicon Oasis, Dubai, United Arab Emirates",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=55764-001+IFZA+Business+Park+FZCO%2C+Building+A1%2C+Dubai+Silicon+Oasis%2C+Dubai%2C+United+Arab+Emirates",
  },
];
