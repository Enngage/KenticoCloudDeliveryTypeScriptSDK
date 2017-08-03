import { IContentItem } from '../../interfaces/item/icontent-item.interface';
import { IContentItemSystemAttributes } from '../../interfaces/item/icontent-item-system-attributes.interface'

export abstract class ContentItem implements IContentItem {
    public system: IContentItemSystemAttributes;
    public elements: any;

    public propertyResolver?: (fieldName: string) => string;
    public urlSlugResolver?: (contentItem: IContentItem, value: string) => string;
    public richTextModularResolver?: (contentItem: IContentItem) => string;

    /**
    * Base class representing content item type. All content type models need to extend this class.
    * @constructor
    * @param {(fieldName: string) => string} propertyResolver - Callback used to bind fields returned from Kentico Cloud to a model property. Common usage is to bind e.g. 'FirstName' field from Kentico Cloud response to 'firstName' field in model
    * @param {(contentItem: IContentItem, value: string) => string} urlSlugResolver - Callback used to resolve URL slugs
    * @param {(contentItem: IContentItem) => string} richTextResolver - Callback used to resolve modular content in rich text fields to HTML
    */
    constructor(public options?: {
        propertyResolver?: (fieldName: string) => string,
        urlSlugResolver?: (contentItem: IContentItem, urlSlug: string) => string,
        richTextResolver?: (contentItem: IContentItem) => string;
    }) {
        if (options) Object.assign(this, options);
    }
}