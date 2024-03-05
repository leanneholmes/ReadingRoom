using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BookClubs
{
    public class List
    {
        public class Query : IRequest<Result<List<BookClubDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<BookClubDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<BookClubDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bookClubs = await _context.BookClubs
                    .ProjectTo<BookClubDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<BookClubDto>>.Success(bookClubs);
            }
        }
    }
}