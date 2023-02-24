
export  interface ImenuItem {
    name: string;
    icon: React.ReactNode;
    iconActive: React.ReactNode;
    to?: string;
    type?: string | null | undefined;
    isChild?: boolean | null;
    active?: boolean;
}