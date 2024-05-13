"use client"
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, getTime } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { getToken } from "@/utils/auth";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()
  const [date, setDate] = useState(new Date());
  const [formv, setFormv] = useState(null)
  const [picture, setPicture] = useState(null);

  const FormSchema = z.object({
    file: z.string(),
    // publishTime: z.string().min(2).max(50),
    dob: z.date({
      required_error: "date is required.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', formv);
    try{
    const response = await fetch('http://localhost:8080/api/uploadimage', {
      method: 'POST',
      headers: {
        'authorization': getToken(),
      },
      body: formData
    });

    const result = await response.json();
    router.push('/imagelist')
  }catch(err){
    console.log(err);
  }
  };

  const handleFile = (e) => {
    setFormv(e.target.files[0]);
  }

  return (
    <div className="flex flex-col">
      <div className="form flex flex-col">
        <h2 className="mt-10 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Upload your files
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6 space-x-4">
          upload file and then choose itme and date to publish
        </p>
        {/* <form onSubmit={onSubmit} encType="multipart/form-data">
          <button type="submit"> Submit </button>
        </form> */}
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-6 flex flex-col"
            encType="multipart/form-data"
          >
          <input type="file" name="file" id="file" value={picture} onChange={handleFile} />

             {/* <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      placeholder="Drag image"
                      id="picture"
                      type="file"
                      onChange={handleFile}
                      value={picture}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="publish_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Publish Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                        id="date_btn"
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
