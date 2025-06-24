export type ErreurApiReduite = {
    isErreurMetier: boolean;
    erreurs: Record<string, string>;
    isErreurCodeDetail: boolean;
    erreurCodeMessage?: string;
};