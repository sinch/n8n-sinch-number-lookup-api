import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SinchNumberLookupApiOAuth2Api implements ICredentialType {
	name = 'sinchNumberLookupApiOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Sinch Number Lookup Api OAuth2 API';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/@sinch/-number-lookup-api?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your Sinch project ID',
		},
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
