export const getParticipantName = (participant: Participant) => {
  if (!participant) return 'N/A N/A'
  const { firstName = 'N/A', lastName = 'N/A' } = participant
  return `${firstName} ${lastName}`
}
