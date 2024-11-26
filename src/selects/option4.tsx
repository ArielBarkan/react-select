import React, {useEffect, useRef, useState} from "react";
import Select, {components, SelectInstance, StylesConfig, Options} from "react-select";
import {data} from "../data";
import {generateTitle} from "../utils";

export const Option4 = ()=>{

    /*********/

    const [optionsSelectedCount, setOptionsSelectedCount] = useState<number>(0);
    const [optionsSelected, setOptionsSelected] = useState<[]>([]);
    const [selectActualWidth, setSelectActualWidth] = useState<number>(0);
    const [selectMaxDisplay, setSelectMaxDisplay] = useState<number>(3);
    const [charactersCount, setCharactersCount] = useState<number>(0);
    const [maxCharacterPerWidth, setMaxCharacterPerWidth] = useState<number>(0);
    const refToMyBeautifulSelect = useRef(null)

    const handleInputChange = (options:any)=>{

        setOptionsSelectedCount(options.length);
        setOptionsSelected(options);
        const textCount = generateTitle(options).length;
        setCharactersCount(textCount)

        calculateMaxCharacters(selectActualWidth)
    }

    function calculateMaxCharacters(containerWidth: number, baseWidth: number = 316, baseCharacters: number = 43): void {
        // Calculate the character-per-pixel ratio
        const charPerPixel = baseCharacters / baseWidth;

        // Calculate and return the maximum number of characters for the given container width

        const maxChars:number = Math.floor(containerWidth * charPerPixel);
        setMaxCharacterPerWidth(maxChars)

    }


    const updateSelectWidth = ()=> {
        const width:number = document.getElementById("myLovelySelect")?.offsetWidth || 0
        setSelectActualWidth(width)
        calculateMaxCharacters(width)

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
        if (selectActualWidth > 1000 ){
            numberToDisplay = 8
        }else if(selectActualWidth > 600){
            numberToDisplay = 5
        } else if(selectActualWidth > 450){
            numberToDisplay = 4
        }else if (selectActualWidth < 300 ){
            numberToDisplay = 1
        }else {
            numberToDisplay = 3
        }
        setSelectMaxDisplay(numberToDisplay)
    }, [selectActualWidth]);
    const calculateItemWidth = (): number => {
        let itemWidth:number;
        if(optionsSelectedCount <= selectMaxDisplay){
            itemWidth = ((selectActualWidth/optionsSelectedCount))*(maxCharacterPerWidth/charactersCount)
        }else{
            itemWidth = (selectActualWidth/selectMaxDisplay)-(maxCharacterPerWidth/charactersCount)
        }
/*      // itemWidth = (selectActualWidth/optionsSelectedCount)*( maxCharacterPerWidth/charactersCount)
      //  itemWidth = (selectActualWidth/optionsSelectedCount)*( charactersCount/maxCharacterPerWidth)
     //  itemWidth = ((selectActualWidth)/( maxCharacterPerWidth))
        itemWidth = (selectActualWidth/selectMaxDisplay)-50*/
     //   itemWidth = (selectActualWidth/optionsSelectedCount)-50
     //   itemWidth = ((selectActualWidth/optionsSelectedCount))*(maxCharacterPerWidth/charactersCount)
        return itemWidth
    }

// Custom MultiValue to hide it for the remaining options
    const MultiValue = (props: any) => {
        const { index, data, selectProps } = props;


        // Only render up to `selectMaxDisplay` items, hide the rest
        if (index >= selectMaxDisplay) {
            return null;
        }

        return (
            <span title={props.children}>
                <components.MultiValue {...props} />
            </span>
        );
    };

// Custom ValueContainer to display the "+N" text
    const ValueContainer = (props: any) => {
        const { children } = props;

        const hiddenCount = optionsSelectedCount - selectMaxDisplay;


        return (
            <components.ValueContainer {...props}>
                {children}
                {( hiddenCount > 0 && (
                        <span
                            id="counter"
                            style={{ marginLeft: "8px", fontSize: "14px", color: "#FFF" , backgroundColor:"#628fbb", borderRadius: "5px" , padding: "5px", width:"20px", justifySelf: "self-end"}}
                            title={generateTitle(optionsSelected)}>
        +{hiddenCount}
        </span>)
                )}
            </components.ValueContainer>
        );
    };

// Styles to ensure single-line display
    const customStyles: StylesConfig = {
        multiValue:(base) =>({
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

    return (
        <p style={{width: "50%"}}>
            <u><h3>Option 4</h3></u>
            <p>Select width : <b>{selectActualWidth}</b></p>
            <p>Maximum selected options to display: <b>{selectMaxDisplay}</b></p>
            <p>Current selected options: <b>{optionsSelectedCount}</b></p>
            <p>Current characters in selected options: <b>{charactersCount}</b></p>
            <p>max Character Per Width: <b>{maxCharacterPerWidth}</b></p>
            <p>maxCharacterPerWidth/charactersCount: <b>{maxCharacterPerWidth/charactersCount}</b></p>
            <p>charactersCount/maxCharacterPerWidth: <b>{charactersCount/maxCharacterPerWidth}</b></p>
            <p>calculateItemWidth: <b>{calculateItemWidth()}</b></p>
            <p>total by calc : <b>{selectActualWidth / calculateItemWidth()}</b></p>
            <Select
                ref={refToMyBeautifulSelect}
                id={"myLovelySelect"}
                options={data}
                isMulti
                components={{MultiValue, ValueContainer}}
                onChange={handleInputChange}
                styles={customStyles}
                hideSelectedOptions={false}
            />
        </p>
    );
}