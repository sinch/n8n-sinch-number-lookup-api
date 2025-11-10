import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { numberLookupOperations } from './resources/numberLookup';

export class SinchNumberLookupApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sinch Number Lookup Api',
		name: 'sinchNumberLookupApi',
		icon: 'file:sinch_logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with the Sinch Number Lookup API',
		defaults: {
			name: 'Sinch Number Lookup Api',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'sinchNumberLookupApiOAuth2Api', required: true }],
		requestDefaults: {
			baseURL: 'https://lookup.api.sinch.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				required: true,
				description: 'Your Sinch project ID',
				placeholder: '395fcbf6-20d6-4e76-8242-77106018e197',
			},
			...numberLookupOperations,
		],
	};
}
