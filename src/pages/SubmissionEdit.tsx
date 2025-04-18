import PassSVG from "assets/pass-signup.svg?react";
import MarkdownViewer from "components/MarkdownViewer";
import { axiosInstance } from "data/axiosInstance";
import TagSelector from "features/recruitpost/components/TagSelector";
import useAxios from "hooks/useAxios";
import useFormInput from "hooks/useFormInput";
import useFormTextArea from "hooks/useFormTextArea";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate, useParams } from "react-router";

const SubmissionEdit = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { inputProps: subjectNumber, setValue: setSubjectNumber } =
    useFormInput();
  const { inputProps: content, setValue: setContent } = useFormTextArea();

  const { data, error, loading } = useAxios<SubmissionResponse>(
    `submissions/${id}`,
  );

  useEffect(() => {
    if (!data) return;

    setIsPrivate(data.visibility === "PRIVATE" ? true : false);
    setTags(data.tags.map((e) => e.toString()));
    setSubjectNumber(data.subjectNumber);
    setContent(data.content);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      subjectNumber.value.length <= 0 ||
      content.value.length <= 0 ||
      tags.length < 1
    )
      return;

    try {
      const requestBody: UpdateSubmissionRequest = {
        visibility: isPrivate ? "PRIVATE" : "PUBLIC",
        content: content.value,
        subjectNumber: parseInt(subjectNumber.value),
        tags: tags.map((tag) => parseInt(tag)),
      };

      const res = await axiosInstance.put(`submissions/${id}`, requestBody);

      navigate(`/submissions/${id}`);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const formData = new FormData();

      acceptedFiles.forEach((e) => formData.append("image", e));
      const res = await axiosInstance.postForm(
        `${import.meta.env.VITE_API_URL}/images`,
        formData,
      );

      const images = res.data.images as string[];
      for (const image of images) {
        const appendString = `\n![](${image})`;
        setContent((prevContent) => prevContent.concat(appendString));
      }
    } catch (err: any) {
      alert(err);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-5 p-5 lg:gap-10 xl:w-2/3"
      onSubmit={handleSubmit}
    >
      <h1>문제 풀이 제출</h1>
      <div className="w-full rounded-xs border bg-white p-3 shadow">
        <input
          className="w-full p-1"
          placeholder="문제 번호"
          {...subjectNumber}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="tags">풀이 유형을 선택해주세요.</label>
        <TagSelector id="tags" tags={tags} setTags={setTags} />
      </div>
      <div
        onClick={() => setIsPrivate(!isPrivate)}
        className="flex items-center gap-1 self-end"
      >
        <PassSVG
          className={`h-4 w-4 ${isPrivate ? "stroke-green-500" : "stroke-gray-300"}`}
        />
        <span className="text-sm">팀원에게만 공개</span>
      </div>
      <div className="flex min-h-96 w-full flex-1 flex-col rounded-xs border bg-white p-3 shadow lg:flex-row">
        <textarea
          {...getRootProps()}
          className="h-full w-full resize-none p-2 outline-none"
          placeholder="모집글의 내용을 입력하세요."
          {...content}
        />
        <div className="h-full w-full border-t p-2 break-words lg:border-t-0 lg:border-l">
          <MarkdownViewer markdown={content.value} />
        </div>
      </div>
      <button
        className={`flex h-14 w-[120px] items-center justify-center gap-1 ${disabled ? "button-white" : "button-blue"}`}
        type="submit"
        disabled={disabled && true}
      >
        {disabled && (
          <p className="h-4 w-4 animate-spin rounded-full border-2 border-black border-b-transparent" />
        )}
        <span>완료</span>
      </button>
    </form>
  );
};

export default SubmissionEdit;
