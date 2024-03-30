using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ImageEntityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookClubs_Photos_LogoId",
                table: "BookClubs");

            migrationBuilder.DropIndex(
                name: "IX_BookClubs_LogoId",
                table: "BookClubs");

            migrationBuilder.RenameColumn(
                name: "LogoId",
                table: "BookClubs",
                newName: "Image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "BookClubs",
                newName: "LogoId");

            migrationBuilder.CreateIndex(
                name: "IX_BookClubs_LogoId",
                table: "BookClubs",
                column: "LogoId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookClubs_Photos_LogoId",
                table: "BookClubs",
                column: "LogoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }
    }
}
