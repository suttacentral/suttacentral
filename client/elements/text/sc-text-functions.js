import { API_ROOT } from '../../constants';

let paliReferenceEditions = [];
try {
  const response = await fetch(`${API_ROOT}/pali_reference_edition`);
  paliReferenceEditions = await response.json();
} catch (error) {
  console.error('Failed to fetch paliReferenceEditions:', error);
}
export { paliReferenceEditions };
