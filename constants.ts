import { WishStyle, WishTemplate } from './types';

export const WISH_TEMPLATES: Record<WishStyle, WishTemplate> = {
  [WishStyle.CLASSIC]: {
    title: "Ramzan Mubarak",
    message: (sender, receiver) => 
      `${receiver ? `Dear ${receiver}, ` : ''}May this Ramadan bring you the utmost in peace and prosperity. May lights triumph over darkness. Ramzan Mubarak from ${sender}.`
  },
  [WishStyle.MODERN]: {
    title: "Ramadan Vibes 🌙",
    message: (sender, receiver) => 
      `${receiver ? `Hey ${receiver}! ` : ''}Wishing you a sparkling Ramadan! ✨ May your days be filled with blessings and your nights with prayers. Sent with love by ${sender}.`
  },
  [WishStyle.URDU]: {
    title: "رمضان مبارک",
    message: (sender, receiver) => 
      `${receiver ? `Pyare ${receiver}, ` : ''}Ramzan ki barkatein aap par nazil hon. Allah aap ki sab duayein qabool farmaye. Aapko aur aapke ghar walon ko ${sender} ki taraf se Ramzan Mubarak.`
  },
  [WishStyle.EMOTIONAL]: {
    title: "Blessings & Prayers",
    message: (sender, receiver) => 
      `${receiver ? `Dearest ${receiver}, ` : ''}In this holy month, I pray that Allah removes all your troubles and fills your life with grace. You are always in my prayers. Ramzan Mubarak from ${sender}.`
  }
};
