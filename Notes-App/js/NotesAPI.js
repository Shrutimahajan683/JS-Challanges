export default class NotesAPI{
   static getNodes(){
    const notes=JSON.parse(localStorage.getItem("notes-items")||"[]");
    return notes.sort((a,b)=>{
        return new Date(a.updatedAt)>new Date(b.updatedAt);
    });
   }
   static saveNote(noteToSave){
  const notes=NotesAPI.getNodes();
  const existingNote=notes.find((note)=>note.id===noteToSave.id);
  if(existingNote){
    existingNote.title=noteToSave.title;
    existingNote.body=noteToSave.body;
    existingNote.updatedAt=new Date().toISOString();
  }
  else{
    noteToSave.id=Math.random()*10;
    noteToSave.updatedAt=new Date().toISOString();
     notes.push(noteToSave);
  }
   localStorage.setItem("notes-items",notes);
   }
   static deleteNode(id){
    const notes=NotesAPI.getNodes();
    const newNotes=notes.filter((note)=>note.id===id);
    localStorage.setItem("notes-items",notes);
   }
}