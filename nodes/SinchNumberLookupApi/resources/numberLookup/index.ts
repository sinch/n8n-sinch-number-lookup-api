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
					},
					send: {
						preSend: [
							async function(this, requestOptions) {
								const number = this.getNodeParameter('number') as string;
								const features = this.getNodeParameter('features') as string[];
								
								if (!number.match(/^\+[1-9]\d{1,14}$/)) {
									throw new Error(
										`Invalid phone number format: "${number}". Must be in E.164 format (e.g., +48530645813)`,
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
