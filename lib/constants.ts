export const COMPANY_INFO = {
  name: 'Divine Detail',
  phone: '5614674866',
  phoneDisplay: '561-467-4866',
  email: 'info@divinedetail.com',
  hoursLabel: '7 Days a Week',
  hoursDetail: '7am – 7pm',
  serviceArea: 'Palm Beach & Surrounding Areas',
  location: 'Palm Beach, FL',
  instagram: 'https://www.instagram.com/divinedetailpalmbeach/',
  facebook: 'https://divinedetail.com/contact/',
} as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: COMPANY_INFO.instagram },
  { label: 'Facebook', href: COMPANY_INFO.facebook },
] as const;
