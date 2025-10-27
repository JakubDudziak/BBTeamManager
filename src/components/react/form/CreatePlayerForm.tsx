import {Position} from "../../../types/player.ts";
import {newPlayerSchema, type newPlayerFormValues} from "../../schemas/newPlayer.ts"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";

export default function CreatePlayerForm() {
    const {register, handleSubmit, formState: { errors }} = useForm<newPlayerFormValues>({
        resolver: zodResolver(newPlayerSchema),
        mode: "onBlur"
    });

    const onSubmit = (data: newPlayerFormValues) => {
        console.log("New player data: ", data)

    }

    return(
        <div className="flex flex-col m-4 p-1 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between m-4">
                <h1 className="text-4xl">Player form</h1>
                <a href="/players">
                    <button className={"bg-[url(/icons/close-icon-hard-gray.svg)] size-[40px] border-none bg-white bg-no-repeat bg-center"} type={"button"}></button>
                </a>
            </div>
            <form className="flex flex-col items-center m-4" onSubmit={
                handleSubmit(onSubmit)
            }>
                <div className="w-full flex flex-col items-start">
                    <label htmlFor="firstName" className="text-xl pb-1">First name</label>
                    <input id="firstName" {...register("firstName")} type="text" placeholder="Ex. John" className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.firstName ?
                            <p className="h-6 text-red-500">{errors.firstName.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="lastName" className="text-xl pb-1">Last name</label>
                    <input id="lastName" {...register("lastName")} type="text" placeholder="Ex. Doe" className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.lastName ?
                            <p className="h-6 text-red-500">{errors.lastName.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="number" className="text-xl pb-1">Number</label>
                    <input id="number"  {...register("number")} type="number" placeholder="Please set number from 0 to 99" className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.number ?
                            <p className="h-6 text-red-500">{errors.number.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="position" className="text-xl pb-1">Position: </label>
                    <select id="position" {...register("position")} className="text-base w-full border-solid border-b-2 border-(--middle-gray)">
                        <option value="" disabled selected hidden>--Please choose an option--</option>
                        <option value={Position.PG}>Point Guard</option>
                        <option value={Position.SG}>Shooting Guard</option>
                        <option value={Position.SF}>Small Forward</option>
                        <option value={Position.PF}>Power Forward</option>
                        <option value={Position.C}>Center</option>
                    </select>
                    {
                        errors.number ?
                            <p className="h-6 text-red-500">{errors.number.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="heightCM" className="text-xl pb-1">Height</label>
                    <input id="heightCM" {...register("heightCM")} type="number" placeholder="Enter height in centimetres" className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.heightCM ?
                            <p className="h-6 text-red-500">{errors.heightCM.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="weightKG" className="text-xl pb-1">Weight</label>
                    <input id="weightKG" {...register("weightKG")} type="number" placeholder="Enter weight in kilograms" step={0.1} className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.weightKG ?
                            <p className="h-6 text-red-500">{errors.weightKG.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="age" className="text-xl pb-1">Age</label>
                    <input id="age" {...register("age")} type="number" placeholder="Enter age" className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.age ?
                            <p className="h-6 text-red-500">{errors.age.message}</p> :
                            <div className="h-6"/>
                    }
                    <label htmlFor="photoURL" className="text-xl pb-1">PhotoURL</label>
                    <input id="photoURL" {...register("photoURL")} type="text" className="text-base w-full border-solid border-b-2 border-(--middle-gray)"/>
                    {
                        errors.photoURL ?
                            <p className="h-6 text-red-500">{errors.photoURL.message}</p> :
                            <div className="h-6"/>
                    }
                </div>
                <button type="submit" className="m-4 py-2 px-6 text-2xl text-white bg-(--primary-color) border-none rounded-xl shadow-md">Add player</button>
            </form>
        </div>
    )
}