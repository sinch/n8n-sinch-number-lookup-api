import type { INodeProperties } from 'n8n-workflow';
import { numberLookupDescription } from './lookup';

export const numberLookupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Lookup',
				value: 'lookup',
				action: 'Lookup a phone number',
				description: 'Perform a lookup on a phone number',
				routing: {
					request: {
						method: 'POST',
						url: '=/v2/projects/{{$parameter.projectId}}/lookups/',
						returnFullResponse: true,
						ignoreHttpStatusErrors: true,
					},
					output: {
						postReceive: [
							async function(this, items, responseData) {
								if (responseData.statusCode >= 200 && responseData.statusCode < 300) {
									return items;
								}
								
								const errorBody = responseData.body;
								let message = 'API request failed';
								let description = errorBody?.detail || errorBody?.title || 'Unknown error';
								
								switch (responseData.statusCode) {
									case 400:
										message = 'Invalid Request';
										description = errorBody?.detail || 'Check phone number format and required parameters. Phone number must be in E.164 format.';
										break;
									case 401:
										message = 'Authentication Failed';
										description = 'Invalid OAuth2 credentials. Please check your Client ID and Client Secret in the credentials configuration.';
										break;
									case 402:
										message = 'Account Locked';
										description = 'Your Sinch account requires attention. Please check your account status in the Sinch Dashboard.';
										break;
									case 403:
										message = 'API Access Forbidden';
										description = 'Number Lookup API may not be enabled for your project, or you lack sufficient permissions.';
										break;
									case 404:
										message = 'Number Not Found';
										description = 'The phone number could not be found or does not exist in the network databases.';
										break;
									case 429:
										message = 'Rate Limit Exceeded';
										description = 'Too many requests. Please wait a moment before trying again.';
										break;
									case 500:
										message = 'Internal Server Error';
										description = 'An error occurred on the Sinch API server. Please try again later.';
										break;
									default:
										message = `API Error (${responseData.statusCode})`;
										description = errorBody?.detail || errorBody?.title || 'An unexpected error occurred';
								}
								
								throw new Error(`${message}: ${description}`);
							},
						],
					},
					send: {
						preSend: [
							async function(this, requestOptions) {
								const number = this.getNodeParameter('number') as string;
								const features = this.getNodeParameter('features') as string[];
								
								if (!number.match(/^\+[1-9]\d{1,14}$/)) {
									throw new Error(
										`Invalid phone number format: "${number}". Must be in E.164 format (e.g., +1234567890)`,
									);
								}
								
								const body: {
									number: string;
									features: string[];
									rndFeatureOptions?: { contactDate: string };
								} = {
									number,
									features,
								};
								
								if (features.includes('RND')) {
									const contactDate = this.getNodeParameter('contactDate') as string;
									const dateOnly = contactDate.split('T')[0];
									body.rndFeatureOptions = {
										contactDate: dateOnly,
									};
								}
								
								requestOptions.body = body;
								return requestOptions;
							},
						],
					},
				},
			},
		],
		default: 'lookup',
	},
	...numberLookupDescription,
];
