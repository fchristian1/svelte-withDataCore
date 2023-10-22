export default interface EingangWare {
    id?: string;
    eingangsnummer?: string;
    datum?: string;
    ort?: string;
    warengruppeId?: string
    artId?: string;
    bezeichnung?: string;
    status?: number;
    zuArtikelnummer?: string;
    bearbeitetAm?: string;
    bearbeitetVon?: string;
}