export function formatTime(time:string) {

    const Time = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(time))

  return Time
    
}