<!-- when comment emit it will emiting to event bus
then it will emiting to moderation service to change it status
then from moderation service it will emiting to event bus and from event bus
then passing it to query service -->

it will make update to the event ,
the flow comments created with status = 'pending'
then it emitting to event bus , from event bus it will
emiting to moderation service and query service
with waiting a moderation service
