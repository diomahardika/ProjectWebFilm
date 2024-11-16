import Authenticated from "@/Layouts/Authenticated/Index";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import {Inertia} from "@inertiajs/inertia";

export default function Create({ auth, movie}) {
    const { data, setData, processing, errors } = useForm({
        ...movie
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }
        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <h1 className="text-xl">Update Movie: {movie.name}</h1>
            <hr className="mb-4" />
            <InputError errors={errors} />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        type="text"
                        name="name"
                        defaultValue={movie.name}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter the name of the movie"
                        isError={errors.name}
                    />
                </div>
                <div className="mt-4">
                    <InputLabel forInput="category" value="Category" />
                    <TextInput
                        type="text"
                        name="category"
                        defaultValue={movie.category}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter category"
                        isError={errors.category}
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="video_url" value="Video URL" />
                    <TextInput
                        type="url"
                        name="video_url"
                        defaultValue={movie.video_url}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter video url"
                        isError={errors.video_url}
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="thumbnail" value="Thumbnail" />
                    <img
                        src={`/storage/${movie.thumbnail}`}
                        className="w-32 rounded-md"/>
                    <TextInput
                        type="file"
                        name="thumbnail"
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Insert thumbnail"
                        isError={errors.thumbnail}
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="rating" value="Rating" />
                    <TextInput
                        type="number"
                        name="rating"
                        defaultValue={movie.rating}
                        variant="primary-outline"
                        handleChange={onHandleChange}
                        placeholder="Enter rating"
                        isError={errors.rating}
                    />
                </div>
                <div className="mt-4 flex flex-row items-center">
                    <InputLabel
                        className="mt-2 mr-2"
                        htmlFor="is_featured"
                        value="Is featured"
                    />
                    <Checkbox
                        name="is_featured"
                        handleChange={(e) =>
                            setData("is_featured", e.target.checked)
                        }
                        checked={movie.is_featured}
                    />
                </div>
                <Button type="submit" className="mt-4" processing={processing}>
                    Save
                </Button>
            </form>
        </Authenticated>
    );
}
