using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Images
{
    public class Delete
    {
        public class Command: IRequest<Result<Unit>>
        {
            public string Id { get; set; }

            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext _context;
                private readonly IImageAccessor _imageAccessor;
                public Handler(DataContext context, IImageAccessor imageAccessor)
                {
                    _context = context;
                    _imageAccessor = imageAccessor;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var result = await _imageAccessor.DeleteImage(request.Id);

                    if (result == null) return Result<Unit>.Failure("Failed to delete the image");

                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}