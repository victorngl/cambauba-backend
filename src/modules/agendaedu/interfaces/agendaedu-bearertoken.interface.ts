export interface IAgendaEduBearerTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    created_at: number;
}

export interface IAgendaEduBearerTokenRequest {
    grant_type: string;
    client_id: string;
    client_secret: string;
}