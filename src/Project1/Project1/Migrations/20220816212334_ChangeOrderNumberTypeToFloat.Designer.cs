﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Project1.Data;

namespace Project1.Migrations
{
    [DbContext(typeof(Project1Context))]
    [Migration("20220816212334_ChangeOrderNumberTypeToFloat")]
    partial class ChangeOrderNumberTypeToFloat
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Project1.Models.ShippingOrder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LoadingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LoadingDate")
                        .HasColumnType("datetime2");

                    b.Property<float>("OrderNumber")
                        .HasColumnType("real");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<string>("TrailerRegNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TruckRegNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UnloadingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UnloadingDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ShippingOrder");
                });
#pragma warning restore 612, 618
        }
    }
}
