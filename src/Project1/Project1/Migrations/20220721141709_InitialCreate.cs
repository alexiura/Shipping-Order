using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Project1.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShippingOrder",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TruckRegNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrailerRegNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoadingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoadingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UnloadingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UnloadingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingOrder", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShippingOrder");
        }
    }
}
