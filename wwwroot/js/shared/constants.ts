 type imageModifier = 'slide-wrapper__thumbnail-picture--info'
    | 'slide-wrapper__thumbnail-picture--question'
    | 'slide-wrapper__thumbnail-picture--yesno';

 type componentPath = '/js/components/AvailableSlide.html'
    | '/js/components/SidebarItem.html'
    | ''

type selector = '#right-sidebar-container'
    | '.plus-button'
    | '.slide-wrapper'
    | '[data-schemeName]'
    | '#left-sidebar-container'
    | '#global-meta'
    | ''

type attributes = 'data-order-max' 
    | ''

type events = 'QuestionAdded'
    | 'QuestionUpdated'
    | ''

export {
    imageModifier,
    componentPath,
    selector,
    attributes,
    events
}