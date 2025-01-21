export enum CommandsWebsocketBlogEnum {
  // Получить все комментарии
  loadComments = 'loadComments',
  // Добавить новый комментарий
  newComment = 'newComment',

  // ---- На отправку ---
  // Вернуть комментарии в клиентскую часть
  returnedComments = 'returnComments',
}
