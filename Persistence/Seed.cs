using System.ComponentModel;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context,
      UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any() && !context.BookClubs.Any() && !context.Photos.Any())
      {
        var users = new List<AppUser> {
          new AppUser {
            DisplayName = "test", UserName = "testuser", Email = "test@test.com"
          },
          new AppUser {
            DisplayName = "Deanna", UserName = "deanna", Email = "deanna@test.com"
          },
          new AppUser {
            DisplayName = "Leanne", UserName = "leanne", Email = "leanne@test.com"
          },
          new AppUser {
            DisplayName = "Brian", UserName = "brian", Email = "brian@test.com"
          },
          new AppUser {
            DisplayName = "Set", UserName = "set", Email = "set@test.com"
          },
          new AppUser {
            DisplayName = "Aryan", UserName = "aryan", Email = "aryan@test.com"
          },
           new AppUser {
            DisplayName = "Jermaine", UserName = "Cole", Email = "jermaine@test.com"
          },
          new AppUser {
            DisplayName = "Kanye", UserName = "West", Email = "kanye@test.com"
          },
          new AppUser {
            DisplayName = "Chris", UserName = "Brown", Email = "chris@test.com"
          },
        };

        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "Pa$$w0rd");
        }

        var bookClubs = new List<BookClub> {
          new BookClub {
            Name = "Mystery Readers",
              Description = "A club for mystery enthusiasts",
              Category = "Mystery",
              ReadingPace = "Moderate",
              NextMeeting = DateTime.UtcNow.AddMonths(1),
              MeetingLink = "www.zoomlink.com/mysteryreaders",
              CurrentBook = "The Girl with the Dragon Tattoo",
              CurrentBookAuthor = "Stieg Larsson",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[1],
                    IsOwner = true
                }
              }
          },
          new BookClub {
            Name = "Classic Literature Society",
              Description = "Exploring the world of classic literature",
              Category = "Classics",
              ReadingPace = "Slow",
              NextMeeting = DateTime.UtcNow.AddMonths(2),
              MeetingLink = "www.zoomlink.com/classicsociety",
              CurrentBook = "Pride and Prejudice",
              CurrentBookAuthor = "Jane Austen",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[2],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[3],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[0],
                    IsOwner = true
                },
              }
          },
          new BookClub {
            Name = "Sci-Fi Galaxy Explorers",
              Description = "Diving into the realms of science fiction",
              Category = "Sci-Fi",
              ReadingPace = "Fast",
              NextMeeting = DateTime.UtcNow.AddMonths(1),
              MeetingLink = "www.zoomlink.com/scifigalaxy",
              CurrentBook = "Dune",
              CurrentBookAuthor = "Frank Herbert",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[3],
                    IsOwner = true
                },
                new BookClubMember {
                  AppUser = users[4],
                    IsOwner = false
                }
              }
          },
          new BookClub {
            Name = "Historical Fiction Voyage",
              Description = "Embarking on historical journeys through fiction",
              Category = "Fiction",
              ReadingPace = "Moderate",
              NextMeeting = DateTime.UtcNow.AddMonths(2),
              MeetingLink = "www.zoomlink.com/historicalvoyage",
              CurrentBook = "The Nightingale",
              CurrentBookAuthor = "Kristin Hannah",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[4],
                    IsOwner = true
                },
                new BookClubMember {
                  AppUser = users[5],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[1],
                    IsOwner = false
                }
              }
          },
          new BookClub {
            Name = "Romantic Fiction Club",
              Description = "Exploring and discussing romantic fiction novels.",
              Category = "Fiction",
              ReadingPace = "Moderate",
              NextMeeting = DateTime.UtcNow.AddMonths(2),
              MeetingLink = "www.zoomlink.com/RomanticFictionClub",
              CurrentBook = "The Notebook",
              CurrentBookAuthor = "Nicholas Sparks",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[4],
                    IsOwner = true
                },
                new BookClubMember {
                  AppUser = users[2],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[1],
                    IsOwner = false
                }
              }
          },
          new BookClub {
            Name = "Biography and Autobiography Club",
              Description = "Embarking life and minds of the most impactful people in history.",
              Category = "Biography/Autobiography",
              ReadingPace = "Slow",
              NextMeeting = DateTime.UtcNow.AddMonths(2),
              MeetingLink = "www.zoomlink.com/biography_autobiography",
              CurrentBook = "Meditations",
              CurrentBookAuthor = "Marcus Aurelius",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[5],
                    IsOwner = true
                },
                new BookClubMember {
                  AppUser = users[6],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[7],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[8],
                    IsOwner = false
                }
              }
          },
        };
        await context.BookClubs.AddRangeAsync(bookClubs);

        var photos = new List<Photo> {
            new Photo {
                Id = "1",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219372773483352084/Kanye_West.jpg?ex=660b1064&is=65f89b64&hm=d293141491dc3d97bab24ca4d71029cf6bf473b866104def8139ee5313f46e54&"
            },
            new Photo {
                Id = "2",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219373058800881674/j_cole.jpg?ex=660b10a8&is=65f89ba8&hm=8c692b605c78985ee03dd52924a349769167676420b44291d8b006bf30a530a5&"
            },
            new Photo {
                Id = "3",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219374580494241894/chris_brown.webp?ex=660b1212&is=65f89d12&hm=e4dd81da5c13b64502e9762c84a3b30c3bbe4f0bb995ee7510ef674737a6a077&"
            },
            new Photo {
                Id = "4",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219378528173297778/myster_books.jpg?ex=660b15c0&is=65f8a0c0&hm=3817ef2ece3852cdf0261adceafa22645f931cee2b553b48782c2c7ee68fa62a&"
            },
            new Photo {
                Id = "5",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219378990758887555/Classic_Literature_.jpg?ex=660b162e&is=65f8a12e&hm=8ac94eaf722433e4d91a227242743222e447ada0bf8b830be7a059e29a097c3d&"
            },
            new Photo {
                Id = "6",
                Url = "https://media.discordapp.net/attachments/1218431020420825160/1219379935232266260/Sci-Fi_Galaxy_Explorers.jpeg?ex=660b170f&is=65f8a20f&hm=5ad1ff6c89b6e0bf2ce09381e19592cabc4de267674d0617167493c296b70ca4&=&format=webp"
            },
            new Photo {
                Id = "7",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219379965091643462/Historical-Fiction-for-Book-Clubs-BRR-Blog.webp?ex=660b1716&is=65f8a216&hm=60631173e5adfe68f9f262b49b258362513ad54f88523fd3705b5a1ee1a0807c&"
            },
            new Photo {
                Id = "8",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219379965091643462/Historical-Fiction-for-Book-Clubs-BRR-Blog.webp?ex=660b1716&is=65f8a216&hm=60631173e5adfe68f9f262b49b258362513ad54f88523fd3705b5a1ee1a0807c&"
            },
            new Photo {
                Id = "9",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219380050407854080/t2-e-2601-biography-and-autobiography-display-banner-_ver_1.jpg?ex=660b172b&is=65f8a22b&hm=6bbb1292e33023c26f28545475cb3413d29e875f931652a46ee926fe727838e1&"
            },
            new Photo {
                Id = "10",
                Url = "https://cdn.discordapp.com/attachments/1218431020420825160/1219380007458181200/Romantic_Fiction_Club.png?ex=660b1720&is=65f8a220&hm=f7d38d2f9280a2602081c9abb7186921114500b0af23f57b73c95abbaa82ed92&"
            },
        };
        await context.Photos.AddRangeAsync(photos);

        var comments = new List<Comment> {
          new Comment {
              Body = "This is a Great Book Club.",
              Author = users[3],
              BookClub = bookClubs[0],
              CreatedAt = DateTime.UtcNow
          },
          new Comment {
              Body = "I Love Reading This Book.",
              Author = users[1],
              BookClub = bookClubs[0],
              CreatedAt = DateTime.UtcNow
          },
          new Comment {
              Body = "Book 8 of Meditations is amazing",
              Author = users[1],
              BookClub = bookClubs[0],
              CreatedAt = DateTime.UtcNow
          },
          new Comment {
              Body = "Did anyone else feel that the plot twist was a bit predictable?",
              Author = users[7], // Randomly selected from range 0-8
              BookClub = bookClubs[1], // Randomly selected from range 0-5
              CreatedAt = DateTime.UtcNow
          },
          new Comment {
              Body = "This meeting was incredibly insightful, learned a lot!",
              Author = users[4], // Randomly selected from range 0-8
              BookClub = bookClubs[4], // Randomly selected from range 0-5
              CreatedAt = DateTime.UtcNow
          },
          new Comment {
              Body = "The author's writing style is so captivating, can't wait for the next book.",
              Author = users[1], // Randomly selected from range 0-8
              BookClub = bookClubs[1], // Randomly selected from range 0-5
              CreatedAt = DateTime.UtcNow
          },
          new Comment {
              Body = "I'm having trouble understanding the protagonist's motives.",
              Author = users[5], // Randomly selected from range 0-8
              BookClub = bookClubs[0], // Randomly selected from range 0-5
              CreatedAt = DateTime.UtcNow
          }
      };
        await context.SaveChangesAsync();
      }
    }
  }
}