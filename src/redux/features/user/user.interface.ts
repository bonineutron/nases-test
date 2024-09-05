export interface IUserApp {
   accessToken: string;
   email: string;
   emailVerified: boolean | null;
   familyName: string;
   givenName: string;
   hd: string;
   name: string;
   picture: string;
   sub: string;
   permissions: string[] | null;
}
