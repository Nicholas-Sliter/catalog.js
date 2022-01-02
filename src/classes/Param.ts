export default class Param{
   name: string;
   value: string;

   constructor(name: string, value: string){
      this.name = name;
      this.value = value;
   }

   public getObject(): object{
      return {
         name: this.name,
         value: this.value
      }
   }

}