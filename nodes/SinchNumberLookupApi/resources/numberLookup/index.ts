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
						},
					},
				},
			},
		],
		default: 'lookup',
	},
	...numberLookupDescription,
];
