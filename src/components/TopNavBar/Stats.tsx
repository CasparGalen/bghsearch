
import { useStats } from 'react-instantsearch';


export function Stats() {
  const {
    nbHits,
    processingTimeMS,
  } = useStats();

  return (<p className="text-xs">{nbHits} Ergebnisse ({processingTimeMS/1000} Sekunden)</p>);
}
