import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SinchNumberLookupApiOAuth2Api implements ICredentialType {
	name = 'sinchNumberLookupApiOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Sinch Number Lookup Api OAuth2 API';

	documentationUrl = 'https://developers.sinch.com/docs/number-lookup-api-v2/api-reference/authentication/oauth';

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://auth.sinch.com/oauth2/token',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];

	icon = undefined;
}
