// Service Management Feature Module
// 
// Architecture Explanation:
// 
// 1. Why ViewModels exist:
//    ViewModels serve as the presentation logic layer that bridges the gap between 
//    UI components (Screens) and Application Use Cases. They manage UI state, handle 
//    user interactions, and coordinate use case execution. This separation ensures 
//    that screens remain simple and focused on rendering, while business logic for 
//    UI state management lives in testable, reusable view models.
//
// 2. Why Screens never access repositories:
//    Screens should only communicate with Use Cases through ViewModels. This follows 
//    Clean Architecture principles where dependencies point inward. Repositories are 
//    infrastructure concerns that should be abstracted away from the presentation layer.
//    This ensures:
//    - Testability: Screens can be tested with mock use cases
//    - Flexibility: Repository implementations can change without affecting UI
//    - Single Responsibility: Each layer has a clear, focused purpose
//
// 3. Why Service Management belongs to Features:
//    The features directory contains feature modules that represent complete user-facing
//    capabilities. Service Management is a cohesive feature that includes:
//    - UI components (ServiceCard, ServiceForm, ServiceList, etc.)
//    - Screens (ServicesScreen, AddServiceScreen, EditServiceScreen)
//    - Hooks for React integration (useServices, useCreateService, etc.)
//    - ViewModels for state management (ServiceFormViewModel, ServiceListViewModel)
//    This organization keeps all service-related code together and isolated from other features.
//
// 4. How UI communicates only with Use Cases:
//    The UI layer (Screens and Components) interacts exclusively with Use Cases through
//    ViewModels and Hooks. Use Cases represent application-specific business rules and
//    operations. This design ensures:
//    - Clear boundaries between layers
//    - Business logic is centralized and testable
//    - UI changes don't affect core business logic
//    - Use Cases can be reused across different UI implementations

export * from './components';
export * from './screens';
export * from './hooks';
export * from './viewmodels';
export * from './types';
