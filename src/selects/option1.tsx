import React from "react";
import Select, {components, StylesConfig} from "react-select";
import {data} from "../data";
import {generateTitle} from "../utils";

export const Option1 = ()=>{

    /*********/
    const [optionsSelectedCount, setOptionsSelectedCount] = React.useState<number>(0);
    const [optionsSelected, setOptionsSelected] = React.useState<[]>([]);

    const selectedLimit=3
    const handleInputChange = (options:any)=>{
        setOptionsSelectedCount(options.length);
        setOptionsSelected(options);
    }

// Custom MultiValue to hide it for the remaining options
    const MultiValue = (props: any) => {
        const { index, data, selectProps } = props;


        // Only render up to `selectedLimit` items, hide the rest
        if (index >= selectedLimit) {
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


        const hiddenCount = optionsSelectedCount - selectedLimit;

        return (
            <components.ValueContainer {...props}>
                {children}
                {hiddenCount > 0 && (
                    <span style={{ marginLeft: "8px", fontSize: "14px", color: "#FFF" , backgroundColor:"#628fbb", borderRadius: "5px" , padding: "5px"}} title={generateTitle(optionsSelected)}>
          +{hiddenCount}
        </span>
                )}
            </components.ValueContainer>
        );
    };

// Styles to ensure single-line display
    const customStyles: StylesConfig = {
        valueContainer: (base) => ({
            ...base,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        }),
        control: (base) => ({
            ...base,
            width: "400px",
        }),
    };


    /*********/


    return (
<p style={{ width:"400px"}}>
        <Select
            id={"hello"}
            options={data}
            isMulti
            components={{ MultiValue, ValueContainer }}
            onChange={handleInputChange}
            styles={customStyles}
            hideSelectedOptions={false}
        />
</p>
    );
}