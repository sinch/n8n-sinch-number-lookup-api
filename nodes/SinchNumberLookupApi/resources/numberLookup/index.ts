import type { INodeProperties } from 'n8n-workflow';
import { numberLookupDescription } from './lookup';

const showOnlyForNumberLookup = {
	resource: ['numberLookup'],
};

export const numberLookupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForNumberLookup,
		},
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
						body: {
							number: '={{$parameter.number}}',
							features: '={{$parameter.features}}',
							'={{$parameter.features.includes("RND") ? "rndFeatureOptions" : null}}': '={{$parameter.features.includes("RND") ? { contactDate: $parameter.contactDate.split("T")[0] } : undefined}}',
						},
					},
					send: {
						preSend: [
							async function(this, requestOptions) {
								// Clean up the body - remove null keys and format properly
								const body: {
									number: string;
									features: string[];
									rndFeatureOptions?: { contactDate: string };
								} = {
									number: this.getNodeParameter('number') as string,
									features: this.getNodeParameter('features') as string[],
								};
								
								// Add RND options if RND feature is selected
								if (body.features.includes('RND')) {
									const contactDate = this.getNodeParameter('contactDate') as string;
									// Extract date in YYYY-MM-DD format
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
