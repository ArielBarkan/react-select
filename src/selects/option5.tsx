import React, {useEffect, useRef, useState} from "react";
import Select, {components, SelectInstance, StylesConfig, Options} from "react-select";
import {data} from "../data";
import {generateTitle} from "../utils";

export const Option5 = ()=>{

    /*********/

    const [optionsSelectedCount, setOptionsSelectedCount] = useState<number>(0);
    const [optionsSelected, setOptionsSelected] = useState<[]>([]);
    const [selectActualWidth, setSelectActualWidth] = useState<number>(0);
    const [selectMaxDisplay, setSelectMaxDisplay] = useState<number>(3);
    const refToMyBeautifulSelect = useRef(null)

    const handleInputChange = (options:any)=>{


        setOptionsSelectedCount(options.length);
        setOptionsSelected(options);
    }


    const updateSelectWidth = ()=> {
        setSelectActualWidth(document.getElementById("myLovelySelect")?.offsetWidth || 0)
    }

    useEffect(() => {
       updateSelectWidth()

        window.addEventListener('resize', updateSelectWidth);

        return () => {
            window.removeEventListener('resize', updateSelectWidth);
        };
    }, []);




    useEffect(() => {
        let numberToDisplay:number;
       if(selectActualWidth > 600){
            numberToDisplay = 5
        } else if(selectActualWidth > 450){
            numberToDisplay = 3
        }else if (selectActualWidth < 300 ){
            numberToDisplay = 1
        }else {
            numberToDisplay = 2
        }
        setSelectMaxDisplay(numberToDisplay)
    }, [selectActualWidth]);
    const calculateItemWidth = (): number => {
        let itemWidth:number;
        if(optionsSelectedCount < selectMaxDisplay){
            itemWidth = (selectActualWidth/optionsSelectedCount)-80
        }else{
            itemWidth = (selectActualWidth/selectMaxDisplay)-50
        }

 return itemWidth
    }

// Custom MultiValue to hide it for the remaining options
    const MultiValue = (props: any) => {
        const { index, data, selectProps } = props;

        console.log({props})
        // Only render up to `selectMaxDisplay` items, hide the rest
         if (index >= selectMaxDisplay) {
             const hiddenCount = optionsSelectedCount - selectMaxDisplay;

                 return (
                     <span
                         id="counter"
                         style={{
                             marginLeft: "8px",
                             fontSize: "14px",
                             color: "#FFF",
                             backgroundColor: "#628fbb",
                             borderRadius: "5px",
                             padding: "5px",
                             width: "20px",
                             justifySelf: "self-end"
                         }}
                         title={generateTitle(optionsSelected)}>
                +{hiddenCount}
            </span>

                 );


         }

        return (
            <span title={props.children}>
                <components.MultiValue {...props} />
            </span>
        );
    };



// Styles to ensure single-line display
    const customStyles: StylesConfig = {
        multiValue: (base) => ({
            ...base,
            maxWidth: `${calculateItemWidth()}px`,
        }),
        valueContainer: (base) => ({
            ...base,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",

        }),
        control: (base) => ({
            ...base,
            overflow: "hidden",
            whiteSpace: "nowrap",
        }),
    };


    /*********/
const getData = () =>{
    let options = data
    return options
}

    return (
        <p style={{width: "50%"}} >
            <u><h3>Option 5</h3></u>
            <p>Select width : <b>{selectActualWidth}</b></p>
            <p>Maximum selected options to display: <b>{selectMaxDisplay}</b></p>
            <p>Current selected options: <b>{optionsSelectedCount}</b></p>
            <Select
                ref={refToMyBeautifulSelect}
                id={"myLovelySelect"}
                options={getData()}
                isMulti
                components={{MultiValue}}
                onChange={handleInputChange}
                styles={customStyles}
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
            />
        </p>
            );
            }