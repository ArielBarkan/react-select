import {Option1} from "./selects/option1";
import {Option2} from "./selects/option2";
import {Option3} from "./selects/option3";
import {Option4} from "./selects/option4";



const App = () => {

    window.addEventListener("click", () => {
        console.log("--------------")
        console.log(document.getElementById("myLovelySelect")||"not found")
        console.log("--------------")
    })
  return(
      <>
          {/*<Option1/>*/}
          {/*<hr/>*/}
          {/*<Option2/>*/}
          {/*<hr/>*/}
          {/*<Option3/>*/}
          {/*<hr/>*/}
          <Option4/>
      </>
  )

};

export default App;
