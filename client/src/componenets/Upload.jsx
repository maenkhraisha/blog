import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";
const authenticator = async () => {
    try {
        // Perform the request to the upload authentication endpoint.
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/post/upload-auth`
        );

        if (!response.ok) {
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`
            );
        }

        // Parse and destructure the response JSON for upload credentials.
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;

        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

const Upload = ({ children, type, progress, setProgress, setData, data }) => {
    const ref = useRef(null);

    const onSuccess = (res) => {
        toast.success("File uploaded successfully");

        setData(res);
    };
    const onError = (err) => {
        toast.error("File upload failed");
    };
    const onUploadProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
    };

    return (
        <>
            <IKContext
                publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
                urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                authenticator={authenticator}>
                <IKUpload
                    useUniqueFileName
                    // fileName=''
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    className='hidden'
                    ref={ref}
                    accept={`${type}/*`}
                />
                <div
                    onClick={() => ref.current.click()}
                    className='cursor-pointer'>
                    {children}
                </div>
                {data && (
                    <img
                        className='h-[130px] w-[130px]  object-fill rounded-xl  '
                        src={data.url}
                        alt=''
                    />
                )}
            </IKContext>
            <div
                className={`${
                    (progress > 0) & (progress < 100) ? "" : "hidden"
                } w-full bg-gray-400 rounded-full h-7 dark:bg-gray-700 relative`}>
                <div
                    className='bg-blue-600 h-7 rounded-full flex items-center justify-center'
                    style={{ width: `${progress}%` }}>
                    <span className='text-white font-semibold text-[22px] absolute left-1/2'>
                        {progress}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Upload;
