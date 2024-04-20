import {useInstantSearch} from 'react-instantsearch';

export function LoadingAnimation() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ border: '4px solid #f3f3f3', borderRadius: '50%', borderTop: '4px solid #000000', width: '50px', height: '50px', animation: 'spin 2s linear infinite' }}>
        </div>
    </div>
  );
};


export function LoadingIndicator() {
  const { status } = useInstantSearch();

  if ( status === 'loading' || status === 'stalled') {
    return (
      <LoadingAnimation />
    );
  }
  return null;
}
