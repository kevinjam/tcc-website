/** Official Trinity Christian Church contact details */
export const CHURCH_CONTACT = {
  addressLine1: 'Rubaga Road - Kampala',
  addressLine2: 'P.O.Box 14055 Mengo - Kampala - Uganda',
  fullAddress: 'Rubaga Road - Kampala, P.O.Box 14055 Mengo - Kampala - Uganda',
  phones: [
    '+256 776 955 255',
    '+256 752 955 255',
    '+256 752 460 654',
    '+256 779 528 514',
    '+256 782 537 043',
  ],
  primaryPhone: '+256 776 955 255',
  website: 'www.trinitychristianchurch.org.ug',
  websiteUrl: 'https://www.trinitychristianchurch.org.ug',
  emails: [
    'info@trinitychristianchurch.org.ug',
    'brigade@trinitychristianchurch.org.ug',
    'echurch@trinitychristianchurch.org.ug',
  ],
  primaryEmail: 'info@trinitychristianchurch.org.ug',
  facebookUrl: 'https://www.facebook.com/tccrubagaroad',
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029Vb7Eq33IN9ijt1A1cs1c',
  ictHubWhatsappUrl: 'https://chat.whatsapp.com/BpUCBnvgi508q88PhlpGVo',
} as const;

/** Official Radio TCC stream + public player site */
export const RADIO_TCC = {
  streamUrl: 'http://stream.radiojar.com/3xdv7d8gmbpwv',
  siteUrl: 'https://radio.tccug.org/',
} as const;

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
