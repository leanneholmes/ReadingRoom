using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IImageAccessor
    {
        Task<PhotoUploadResult> AddImage(IFormFile file);
        Task<string> DeleteImage(string publicId);
    }
}