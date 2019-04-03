import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { NgxComponentOutletAdapterRef } from './adapter-ref';
import { resolveLifecycleComponents } from './lifecycle.strategies';

/**
 * @deprecated
 */
@Injectable()
export class NgxComponentOutletAdapterBuilder {
  create<TComponent>(
    componentType: Type<TComponent>,
    viewContainerRef: ViewContainerRef,
    injector: Injector,
    projectableNodes: any[][],
    host: TComponent,
    componentFactoryResolver: ComponentFactoryResolver
  ): NgxComponentOutletAdapterRef<TComponent> {
    const componentFactory: ComponentFactory<
      TComponent
    > = componentFactoryResolver.resolveComponentFactory(componentType);

    const componentRef: ComponentRef<TComponent> = viewContainerRef.createComponent(
      componentFactory,
      viewContainerRef.length,
      injector,
      projectableNodes
    );

    const { onInitComponentRef, doCheckComponentRef } = resolveLifecycleComponents(
      componentFactory.componentType,
      viewContainerRef,
      componentFactoryResolver
    );

    return new NgxComponentOutletAdapterRef({
      componentFactory,
      componentRef,
      host,
      onInitComponentRef,
      doCheckComponentRef,
    });
  }
}
