import dayjs from "dayjs";
import Catalog from "./classes/Catalog";
import Course from "./classes/Course";

export async function parseCatalog(catalogObj){

   const catalog = new Catalog();

   catalog.href = catalogObj.rss.channel[0].link[0];

   const termObj = catalogObj.rss.channel[0]['catalog:chosen_term'][0];
   catalog.term = parseCourseInfo(termObj, models.Term); //change this to account for Term Class

   catalogObj.rss.channel[0].item.forEach(course => {
      catalog.courses.push(parseCourse(course));
   });


}

export async function parseCourse(courseObj){

   const course = new Course();

}