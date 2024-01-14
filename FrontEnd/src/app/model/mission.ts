export interface Mission{
    idm: number;
    startDate: Date;
    endDate: Date;
    company: string;
    description: string;
    hourlyRate: number;
    em_fk: number;
}