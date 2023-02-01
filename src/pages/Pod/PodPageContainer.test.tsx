import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
// import { describe, it, expect, vi } from 'vitest';
// import PodPageContainer from './PodPageContainer';
// import { mockFePod } from '../../data/MockFEPod';
// import {
//   useActivePods,
//   useAvailablePods,
//   useCompletedPods,
// } from './Hooks/customHook';
// import {
//   convertToStringArr,
//   generatePodTags,
//   getAvailablePodTag,
// } from '../../utils/utilityFunctions';
// import PageRoutes from '../PageRoutes/PageRoutes';

// vi.mock('./Hooks/customHook');
// vi.mock('../../utils/utilityFunctions');

// const mockUseAvailablePods = useAvailablePods as jest.MockedFunction<
//   typeof useAvailablePods
// >;

// const mockGetAvailablePodTags = getAvailablePodTag as jest.MockedFunction<
//   typeof getAvailablePodTag
// >;
// const mockUseActivePods = useActivePods as jest.MockedFunction<
//   typeof useActivePods
// >;

// const mockGetActivePendingPodTag = generatePodTags as jest.MockedFunction<
//   typeof generatePodTags
// >;

// const mockConvertToStringArr = convertToStringArr as jest.MockedFunction<
//   typeof convertToStringArr
// >;

// const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

// const techList = ['Java', '.Net', 'React', 'JavaScript'];

// describe('Testing pod page container', async () => {
//   it('display alert component', async () => {
// const locationMock = {
//   hash: '',
//   key: 'ju2w1j46',
//   pathname: '/pod/active',
//   search: '',
//   state: null,
// };
// mockUseLocation.mockReturnValue(locationMock);
// mockUseAvailablePods.mockReturnValue([]);
// mockGetActivePendingPodTag.mockReturnValue({
//   name: 'Active',
//   color: '#E63946',
// });
// mockConvertToStringArr.mockReturnValue(techList);

//     render(<PageRoutes />);
//     const podBtn = screen.getByTestId('pod-item');
//     fireEvent.click(podBtn);
//     await waitFor(() =>
//       expect(screen.getByText('NetZero')).toBeInTheDocument()
//     );
//   });

//   it('display available pod to check if active tag is been display', () => {
//     const mockHook = {
//       podList: mockFePod,
//       setPodList: () => {
//         return null;
//       },
//     };
//     mockUseAvailablePods.mockReturnValue(mockHook);
//     mockGetActivePendingPodTag.mockReturnValue({
//       name: 'Active',
//       color: '#E63946',
//     });
//     mockConvertToStringArr.mockReturnValue(techList);

//     render(
//       <PodPageContainer
//         hook={mockUseAvailablePods}
//         displayPageCarousel={false}
//         displayTag={mockGetActivePendingPodTag}
//         podType={'Available'}
//       />
//     );

//     expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
//       mockFePod[0].podName
//     );
//     const podRowElm = screen.getByTestId('pageSectionTestId');

//     expect(podRowElm?.textContent).toContain('Active');
//   });

//   it('display active pod to check if active tag is been display', () => {
//     const mockHook = {
//       podList: mockFePod,
//       setPodList: () => {
//         return null;
//       },
//     };
//     mockUseActivePods.mockReturnValue(mockHook);
//     mockGetAvailablePodTags.mockReturnValue({
//       name: 'Available',
//       color: '#E63946',
//     });
//     mockConvertToStringArr.mockReturnValue(techList);

//     render(
//       <PodPageContainer
//         hook={mockUseActivePods}
//         displayPageCarousel={false}
//         displayTag={mockGetAvailablePodTags}
//         podType={'Active'}
//       />
//     );

//     expect(screen.queryByText(mockFePod[0].podName)).toHaveTextContent(
//       mockFePod[0].podName
//     );
//     const podRowElm = screen.getByTestId('pageSectionTestId');

//     expect(podRowElm?.textContent).toContain('Available');
//   });
// });
