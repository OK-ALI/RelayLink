export type Page = 'Command Center' | 'Devices' | 'Appearance' | 'Settings';
export type Navigate = (page: Page, search?: string) => void;
