using Microsoft.EntityFrameworkCore.Migrations;

namespace Project1.Migrations
{
    public partial class ChangeOrderNumberTypeToFloat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "OrderNumber",
                table: "ShippingOrder",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "OrderNumber",
                table: "ShippingOrder",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
