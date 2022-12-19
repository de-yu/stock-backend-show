
import 'apollo-cache-control';
import jwt from 'jsonwebtoken';
import Notes from '@/DataBase/Notes';

const notes = new Notes('Notes')

const NotesResolvers = {
  Query: {  
    getNote: async (parent: any , args: any, context: any , info: any) => {
      let member: any = jwt.decode(context.token.substring(7));
      const result = await notes.findNote(args.stockId, member._id);
      
      let note = {
        _id: '',
        content: ''
      };
      if(result.length !== 0) {
        Object.assign(note, result[0]);
      }
      
      return note;
    }
  },
  Mutation: {
    createNote: async (parent: any , args: any, context: any , info: any) => {
      let member: any = jwt.decode(context.token.substring(7));
      const result = notes.createNote(args.stockId, member._id, args.content);

      return 'success';
    }, 
    updateNote: async (parent: any , args: any, context: any , info: any) => {
      let member: any = jwt.decode(context.token.substring(7));

      const result = notes.updateNote(args.noteId, args.content);
      
      return 'success';
    },
    deleteNote: async (parent: any , args: any, context: any , info: any) => {
      const result = notes.deleteNote(args.noteId);

      return 'success';
    }
  }
};

export default NotesResolvers;