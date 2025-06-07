'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mf-angular-16 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#additional-pages"'
                            : 'data-bs-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/microfrontends-architecture.html" data-type="entity-link" data-context-id="additional">Microfrontends Architecture</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-7b50b0785378cfad7eeeee2b363f852feaf4a03b2710d961ac816864c3faa2d1b41a37eae5c9a0eefef932aaf2cc698d87c3aa30406cee215134139994f73571"' : 'data-bs-target="#xs-components-links-module-AppModule-7b50b0785378cfad7eeeee2b363f852feaf4a03b2710d961ac816864c3faa2d1b41a37eae5c9a0eefef932aaf2cc698d87c3aa30406cee215134139994f73571"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7b50b0785378cfad7eeeee2b363f852feaf4a03b2710d961ac816864c3faa2d1b41a37eae5c9a0eefef932aaf2cc698d87c3aa30406cee215134139994f73571"' :
                                            'id="xs-components-links-module-AppModule-7b50b0785378cfad7eeeee2b363f852feaf4a03b2710d961ac816864c3faa2d1b41a37eae5c9a0eefef932aaf2cc698d87c3aa30406cee215134139994f73571"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ComponentsModule-331873f00b5360ecfbc201ae94870b70dc93d25651924f8c584365f5a3bab2ac57187907bb05d9ea842dc2c464cba24bd5520e623236587e905ae0f908eeba31"' : 'data-bs-target="#xs-components-links-module-ComponentsModule-331873f00b5360ecfbc201ae94870b70dc93d25651924f8c584365f5a3bab2ac57187907bb05d9ea842dc2c464cba24bd5520e623236587e905ae0f908eeba31"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-331873f00b5360ecfbc201ae94870b70dc93d25651924f8c584365f5a3bab2ac57187907bb05d9ea842dc2c464cba24bd5520e623236587e905ae0f908eeba31"' :
                                            'id="xs-components-links-module-ComponentsModule-331873f00b5360ecfbc201ae94870b70dc93d25651924f8c584365f5a3bab2ac57187907bb05d9ea842dc2c464cba24bd5520e623236587e905ae0f908eeba31"' }>
                                            <li class="link">
                                                <a href="components/AvailablePlacesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvailablePlacesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavoritePlacesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavoritePlacesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LessonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlacesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacesContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlacesContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimpleFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' : 'data-bs-target="#xs-directives-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' :
                                        'id="xs-directives-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' }>
                                        <li class="link">
                                            <a href="directives/AuthDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SafeLinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafeLinkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' :
                                            'id="xs-pipes-links-module-SharedModule-2cc5acdd47e300a77b0d0eed74196b30412a8da7ddb49d26e942f449ff8077d98801036e6b745641eebf21159d929cb087584c43a56c9210f682161f99aa56e5"' }>
                                            <li class="link">
                                                <a href="pipes/TemperaturePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemperaturePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ErrorService.html" data-type="entity-link" >ErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/RemoteA16Interceptor.html" data-type="entity-link" >RemoteA16Interceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Lesson.html" data-type="entity-link" >Lesson</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewTaskData.html" data-type="entity-link" >NewTaskData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Place.html" data-type="entity-link" >Place</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});